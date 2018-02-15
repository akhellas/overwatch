const hasNode = (root, name) => {
  return root.nodes.find(x => x.name === name) != null
}

const hasConnection = (root, source, target) => {
  return (
    root.connections.find(x => x.source === source && x.target === target) !=
    null
  )
}

const transform = (
  metrics,
  entryName,
  regionFn,
  nodeFn,
  regionDisplayFn,
  nodeDisplayFn
) => {
  nodeFn = nodeFn || regionFn
  regionDisplayFn = regionDisplayFn || regionFn
  nodeDisplayFn = nodeDisplayFn || nodeFn

  const data = {
    renderer: 'global',
    name: 'edge',
    entryNode: entryName,
    nodes: [
      {
        renderer: 'region',
        name: entryName,
        displayName: entryName
      }
    ],
    connections: []
  }
  metrics.forEach(metric => {
    const regionName = regionFn(metric)
    const regionDisplay = regionDisplayFn(metric)
    const nodeName = nodeFn(metric)
    const nodeDisplay = nodeDisplayFn(metric)
    const timestamp = new Date(metric.Timestamp).valueOf()
    if (!hasNode(data, regionName)) {
      data.nodes.push({
        renderer: 'region',
        name: regionName,
        displayName: regionDisplay,
        updated: timestamp,
        maxVolume: 10000,
        nodes: [{ name: entryName }],
        connections: []
      })

      data.connections.push({
        source: entryName,
        target: regionName,
        metrics: {
          normal: 0,
          warning: 0,
          danger: 0
        }
      })
    }
    const region = data.nodes.find(x => x.name === regionName)

    region.updated = timestamp

    if (!hasNode(region, nodeName)) {
      region.nodes.push({
        name: nodeName,
        displayName: nodeDisplay
      })
    }

    if (!hasConnection(region, entryName, nodeName)) {
      region.connections.push({
        source: entryName,
        target: nodeName,
        metrics: {
          normal: 0,
          danger: 5,
          warning: 0
        }
      })
    }

    const nodeCon = region.connections.find(
      x => x.source === entryName && x.target === nodeName
    )
    const regionCon = data.connections.find(
      x => x.source === entryName && x.target === regionName
    )

    switch (metric.StatusCode) {
      case (200, 300, 304):
        nodeCon.metrics.normal += 1
        regionCon.metrics.normal += 1
        break
      case (401, 404):
        nodeCon.metrics.warning += 1
        regionCon.metrics.warning += 1
        break
      case (400, 500):
        nodeCon.metrics.danger += 1
        regionCon.metrics.danger += 1
        break
      default:
        nodeCon.metrics.warning += 1
        regionCon.metrics.warning += 1
    }
  })

  return data
}

export default transform
