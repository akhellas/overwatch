import React from 'react'
import Vizceral from 'vizceral'
import '../App.css'

function getPerformanceNow() {
  const g = window
  if (g != null) {
    const perf = g.performance
    if (perf != null) {
      try {
        const perfNow = perf.now()
        if (typeof perfNow === 'number') {
          return perfNow
        }
      } catch (e) {
        // do nothing
      }
    }
  }
  return null
}

class Overwatch extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.vizceral = new Vizceral(
      this.refs.vizCanvas,
      this.props.targetFramerate || null
    )
    console.log(this.vizceral)
    //this.updateStyles(this.props.styles)

    this.vizceral.on('viewChanged', this.props.viewChanged || (() => {}))
    this.vizceral.on(
      'objectHighlighted',
      this.props.objectHighlighted || (() => {})
    )
    this.vizceral.on('objectHovered', this.props.objectHovered || (() => {}))
    this.vizceral.on('nodeUpdated', this.props.nodeUpdated || (() => {}))
    this.vizceral.on(
      'nodeContextSizeChanged',
      this.props.nodeContextSizeChanged || (() => {})
    )
    this.vizceral.on('matchesFound', this.props.matchesFound || (() => {}))
    this.vizceral.on('viewUpdated', this.props.viewUpdated || (() => {}))

    this.vizceral.setOptions({
      allowDraggingOfNodes: this.props.allowDraggingOfNodes || false,
      showLabels: this.props.showLabels || true
    })

    setTimeout(() => {
      this.vizceral.setView()
      //this.vizceral.setView(this.props.view || [], this.props.objectToHighlight)
      this.vizceral.updateData(this.props.traffic)
      const perfNow = getPerformanceNow()
      this.vizceral.animate(perfNow === null ? 0 : perfNow)
      //this.vizceral.animate()
      this.vizceral.updateBoundingRectCache()
    }, 0)
  }

  componentWillReceiveProps(nextProps) {
    this.vizceral.updateData(nextProps.traffic)
  }

  componentWillUnmount() {
    delete this.vizceral
  }

  render() {
    return (
      <div className="vizceral">
        <canvas style={{ width: '100%', height: '100%' }} ref="vizCanvas" />
        <div className="vizceral-notice" />
      </div>
    )
  }

  updateStyles(styles) {
    const styleNames = this.vizceral.getStyles()
    const customStyles = styleNames.reduce((result, styleName) => {
      result[styleName] = styles[styleName] || result[styleName]
      return result
    }, {})
    this.vizceral.updateStyles(customStyles)
  }
}

export default Overwatch
