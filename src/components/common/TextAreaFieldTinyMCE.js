import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'
// import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/silver'
// import 'tinymce/plugins/link'
// import 'tinymce/plugins/image'
// import 'tinymce/plugins/code'

//import CKEDITOR from 'ckeditor'

class TextAreaFieldTinyMCE extends React.Component {
  render() {
    const style = {
      height: 'auto',
      padding: '0',
      overflow: 'hidden'
    }

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
            <Editor
              apiKey="9w6e04pjrt3ohc1ae6juypnlwdrjk2zlz2wp04t87p7hx7p5"
              initialValue={this.props.value}
              value={this.props.value}
              init={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                height: 500
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

TextAreaFieldTinyMCE.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaFieldTinyMCE
