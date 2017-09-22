export class Metrics {
    constructor(
        public host: string,
        public user: string,
        public method: string,
        public uri: string,
        public statusCode: number,
        public duration: number,
        public size: number
    ) {}
}

export class Node {
    public class = 'normal';
    public maxVolume = 100000;
    public metadata = {};
    public nodes = new Array<Node>();
    public connections = new Array<Connection>();

    constructor(
        public renderer: string,
        public name: string,
        public displayName: string,
    ) { }
}

export class Connection {
    constructor(
        public source: string,
        public target: string,
        public metrics = { normal: 0, warning: 0, danger: 0 },
        public metadata = { avgSize: 0, avgDuration: 0 }
    ) { }
}

export class RegionNode extends Node {
    constructor(name: string, displayName: string, public updated = Date.now()) {
        super('region', name, displayName);
    }
}

export class IrisNode extends RegionNode {
    constructor() {
        super('iris', 'IRIS');
    }
}

export class GeaNode extends RegionNode {
    constructor() {
        super('gea', 'GEA');

        this.nodes.push(
            new Node('focusedChild', 'kepix', 'GEA/KEPIX'),
            new Node('focusedChild', 'iris', 'IRIS')
        );

        this.connections.push(
            new Connection('iris', 'kepix')
        );
    }
}

export class AtaNode extends RegionNode {
    constructor() {
        super('ata', 'ATA');

        this.nodes.push(
            new Node('focusedChild', 'ata.110', '110 CW'),
            new Node('focusedChild', 'ata.111', '111 CW'),
            new Node('focusedChild', 'ata.115', '115 CW'),
            new Node('focusedChild', 'ata.116', '116 CW'),
            new Node('focusedChild', 'ata.117', '117 CW'),
            new Node('focusedChild', 'iris', 'IRIS')
        );

        this.connections.push(
            new Connection('iris', 'ata.110'),
            new Connection('iris', 'ata.111'),
            new Connection('iris', 'ata.115'),
            new Connection('iris', 'ata.116'),
            new Connection('iris', 'ata.117')
        );
    }
}

export class RootNode extends Node {
    public entryNode = 'iris';

    constructor() {
        super('global', 'edge', 'edge');
        this.nodes.push(
            new IrisNode(), 
            new GeaNode(), 
            new AtaNode()
        );

        this.connections.push(
            new Connection('iris', 'gea'),
            new Connection('iris', 'ata'),
            new Connection('gea', 'ata')
        );
    }

    getRegionNode(name: string): Node {
        return this.nodes.find(node => node.name == name.split('.')[0]);
    }

    getRegionConnection(name: string): Connection {
        return this.getRegionNode(name).connections.find(conn => conn.target === 'iris');
    }

    getUnitNode(name: string): Node {
        const region = this.getRegionNode(name);
        if (!region) {
            return null;
        }
        return region.nodes.find(node => node.name == name.split('.')[1]);
    }

    getUnitConnection(name: string) {
        const unit = this.getUnitNode(name);
        return unit ? null : unit.connections.find(conn => conn.target === 'iris');
    }
}

export class NodeManager {
    private static names: { [key: string]: string } = {
        '1': 'gea',
        '4': 'day',
        '5': 'ata',
        '110': 'ata.110',
        '111': 'ata.111',
        '115': 'ata.115',
        '116': 'ata.116',
        '117': 'ata.117',
    }

    static resolve(host: string): string {
        const hosts = host.split('.');
        return this.names[host[1]] || 'unknown';
    }

    static getTraffic(metrics: Array<Metrics>): RootNode {
        const root = new RootNode();

        metrics.forEach(item => {
            const resolved = this.resolve(item.host);

            const region = root.getRegionNode(resolved);
            if (!region) {
                throw new Error('cant get region node');
            }
            
            const regionConnection = root.getRegionConnection(name);
            if (!regionConnection) {
                throw new Error('cant get region connection');
            }

            regionConnection.metadata.avgSize = (regionConnection.metadata.avgSize + item.size) / 2;
            regionConnection.metadata.avgDuration = (regionConnection.metadata.avgDuration + item.duration) / 2;
        });

        return root;
    }

    static getSampleTraffic(): RootNode {
        const root = new RootNode();

        this.createRandomTraffic(root);

        console.log(root);
        return root;
    }

    static createRandomTraffic(node: Node, max = 100) {
        node.connections.forEach(conn => {
            conn.metrics.normal = Math.random() * max;
            conn.metrics.warning = Math.random() * max;
            conn.metrics.danger = Math.random() * max;
        });

        node.nodes.forEach(child => this.createRandomTraffic(child));
    }
}