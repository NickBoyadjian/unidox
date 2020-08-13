import React, { useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw
} from 'draft-js';

import BlockStyleControls from './blockStyleControls';
import InlineStyleControls from './inlineStyleControls';
import userGlobal from '../../state/userState';
import './style.scss';


export default ({ editorState, setEditorState }) => {

  const [userState, userActions] = userGlobal();

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }


  useEffect(() => {
    if (userState.currentNote.body) {
      let state;
      if (userState.currentNote.body.body) {
        state = EditorState.createWithContent(convertFromRaw(userState.currentNote.body.body));
      } else {
        state = EditorState.createWithContent(convertFromRaw(userState.currentNote.body));
      }
      setEditorState(state)
    } else {
      setEditorState(RichUtils.createEmpty());
    }
  }, [userState.currentNote.id, userState.currentNote.body, setEditorState]);

  const saveDocument = () => userActions.updateNote(editorState)

  const onTab = (e) => setEditorState(RichUtils.onTab(e, editorState, 4));

  const toggleBlockType = (blockType) => setEditorState(RichUtils.toggleBlockType(editorState, blockType));

  const toggleInlineStyle = (inlineStyle) => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  let contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div>
      <div className='toolbar'>
        <div className="color-picker">
          <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
        </div>
        <button
          className='style-btn save button is-light'
          onClick={saveDocument} >
          Save
        </button>

      </div>
      <div className="RichEditor-root">
        <div className={className}>
          <Editor
            className='editor'
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={setEditorState}
            onTab={onTab}
            placeholder=""
            spellCheck={true}
          />
        </div>
      </div>
    </div>
  );

}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 0,
    border: '1px solid #252525'
  },
  HIGHLIGHT: {
    backgroundColor: '#faed27',
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}