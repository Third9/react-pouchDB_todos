import React from 'react';

class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <footer id="footer">
         <span id="todo-count"></span>
         <div id="sync-wrapper">
          <div id="sync-success">Currently syncing</div>
          <div id="sync-error">There was a problem syncing</div>
         </div>
      </footer>
    )
  }
}

export default Footer
