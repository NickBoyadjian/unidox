import React from 'react'

import StyleButton from './styleButton'

const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD'
  }, {
    label: 'Italic',
    style: 'ITALIC'
  }, {
    label: 'Underline',
    style: 'UNDERLINE'
  }, {
    label: 'Highlight',
    style: 'HIGHLIGHT'
  }
];

export default (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls controls">
      {INLINE_STYLES.map(
        type => <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};