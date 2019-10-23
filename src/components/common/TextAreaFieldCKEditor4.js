import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import CKEditor from 'ckeditor4-react'
//import CKEDITOR from 'ckeditor'

class TextAreaFieldCKEditor4 extends React.Component {
  constructor(props) {
    super(props)
    this.editorRef = React.createRef()
    this.state = {
      value: ''
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  componentWillUnmount() {
    let editor = this.editorRef.current.editor
    if (editor !== undefined && this.editor !== null) {
      editor.destroy(true)
    }
  }

  render() {
    const style = {
      height: 'auto',
      padding: '0',
      overflow: 'hidden'
    }

    const config = {
      toolbarGroups: [
        { name: 'styles' },
        { name: 'forms' },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'links' },
        { name: 'document', groups: ['mode', 'document', 'doctools'] }
      ],
      allowedContent: true
    }

    // const config_old = {
    //   toolbarGroups: [
    //     { name: 'styles' },
    //     { name: 'forms' },
    //     { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    //     { name: 'links' },
    //     { name: 'document', groups: ['mode', 'document', 'doctools'] }
    //   ],
    //   allowedContent: {
    //     $1: {
    //       // Use the ability to specify elements as an object.
    //       elements: window.CKEDITOR ? window.CKEDITOR.dtd : null,
    //       attributes: true,
    //       styles: true,
    //       classes: true
    //     }
    //   },
    //   disallowedContent: 'script; *[on*]'
    // }

    return (
      <div className="form-group row">
        <label className="col-lg-2 col-form-label form-control-label font-weight-bold">
          {this.props.label ? this.props.label : 'Texto:'}
        </label>
        <div className="col-lg-10">
          <div
            style={style}
            className={classnames('form-control form-control-lg', {
              'is-invalid': this.props.error
            })}>
            <CKEditor
              ref={this.editorRef}
              data={this.state.value}
              type="classic"
              config={config}
              onBeforeLoad={CKEDITOR => {
                return (CKEDITOR.disableAutoInline = true)
              }}
              onChange={this.props.onChange}
            />
          </div>

          {this.props.info && <small className="form-text text-muted">{this.props.info}</small>}
          {this.props.error && <div className="invalid-feedback">{this.props.error}</div>}
        </div>
      </div>
    )
  }
}

TextAreaFieldCKEditor4.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaFieldCKEditor4
