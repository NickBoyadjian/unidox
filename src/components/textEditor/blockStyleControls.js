import React from 'react'
import StyleButton from './styleButton'

const BLOCK_TYPES = [
  {
    label: 'Title',
    style: 'header-one'
  }, {
    label: 'Section',
    style: 'header-two'
  }, {
    label: 'List',
    style: 'ordered-list-item'
  }, {
    label: 'Code Block',
    style: 'code-block'
  }
];

export default (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return (
    <div className="RichEditor-controls controls">
      {BLOCK_TYPES.map(
        (type) => <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};