// import React from 'react'
// import classnames from 'classnames'
// import PropTypes from 'prop-types'
// import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// const TextAreaField_CKEditor = ({ name, label, placeholder, value, error, info, onChange }) => {
//   return (
//     <div className="form-group row">
//       <label className="col-lg-2 col-form-label form-control-label font-weight-bold">{label ? label : 'Texto:'}</label>
//       <div className="col-lg-10">
//         {/* <textarea
//           className={classnames('form-control form-control-lg', {
//             'is-invalid': error
//           })}
//           placeholder={placeholder}
//           name={name}
//           value={value}
//           onChange={onChange}
//         /> */}

//         <CKEditor
//           editor={ClassicEditor}
//           config={{
//             toolbar: [
//               'heading',
//               '|',
//               'bold',
//               'italic',
//               'link',
//               'bulletedList',
//               'numberedList',
//               'blockQuote',
//               'insertTable',
//               '|',
//               'undo',
//               'redo'
//             ],
//             heading: {
//               options: [
//                 { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
//                 { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
//                 { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
//                 { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
//               ]
//             }
//           }}
//           data={value}
//           onInit={editor => {
//             console.log(editor.ui.componentFactory.names())
//             // You can store the "editor" and use when it is needed.
//             console.log('Editor is ready to use!', editor)
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData()
//             console.log({ event, editor, data })
//             onChange(event, data)
//           }}
//         />
//         {info && <small className="form-text text-muted">{info}</small>}
//         {error && <div className="invalid-feedback">{error}</div>}
//       </div>
//     </div>
//   )
// }

// TextAreaField_CKEditor.propTypes = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   info: PropTypes.string,
//   error: PropTypes.string,
//   onChange: PropTypes.func.isRequired
// }

// export default TextAreaField_CKEditor
