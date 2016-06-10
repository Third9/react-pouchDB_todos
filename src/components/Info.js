import React from 'react';

class Info extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <footer id="info">
        <p>Double-click to edit a todo</p>
        <p>Template by <a href="http://github.com/sindresorhus">Sindre Sorhus</a></p>
        <p>Created by <a href="http://twitter.com/ffesseler">Florian Fesseler</a></p>
        <p>Cleanup, edits by <a href="http://github.com/boushley">Aaron Boushley</a></p>
        <p>React convert by <a href="http://github.com/Third9">Hyeock Kwon</a></p>
      </footer>
    )
  }
}

export default Info
