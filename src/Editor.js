import React from 'react';
import {Treebeard} from 'react-treebeard';
import SplitPane from "react-split-pane";
import MonacoEditor from 'react-monaco-editor';

const data = {
  name: 'react-treebeard',
  toggled: true,
  children: [
    {
      name: 'example',
      children: [
        {name: 'app.js'},
        {name: 'data.js'},
        {name: 'index.html'},
        {name: 'styles.js'},
        {name: 'webpack.config.js'}
      ]
    },
    {
      name: 'node_modules',
      loading: true,
      children: []
    },
    {
      name: 'src',
      children: [
        {
          name: 'components',
          children: [
            {name: 'decorators.js'},
            {name: 'treebeard.js'}
          ]
        },
        {name: 'index.js'}
      ]
    },
    {
      name: 'themes',
      children: [
        {name: 'animations.js'},
        {name: 'default.js'}
      ]
    },
    {name: 'Gulpfile.js'},
    {name: 'index.js'},
    {name: 'package.json'}
  ]
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

  render() {
    const code = '// code';
    const options = {
      selectOnLineNumbers: true
    };
    return (

      <SplitPane split="vertical" minSize={50} defaultSize={200} style={{position: 'relative'}}>
        <div style={{background: '#21252B', height: '100%', paddingLeft: 5}}>
          <Treebeard
            data={data}
            onToggle={this.onToggle}
          />
        </div>
        <MonacoEditor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </SplitPane>
    );
  }
}

export default Editor;
