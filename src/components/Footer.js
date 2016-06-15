import React from 'react';

class Footer extends React.Component {
  constructor(props){
    super(props);

    this.sync = this.sync.bind(this);
    this.syncError = this.syncError.bind(this);
    this.state = {
      syncState: 'syncing'
    }
  }

  sync() {
    let opts = {live: true}
    this.props.onReplicateTo(opts, this.syncError);
    this.props.onReplicateFrom(opts, this.syncError);
  }

  syncError() {
    this.setState({
      syncState: 'error'
    });
  }

  componentDidMount() {
    this.sync();
  }

  render(){
    return(
      <footer id="footer">
         <span id="todo-count"
               data-sync-state={this.state.syncState}>
         </span>
         <div id="sync-wrapper">
          <div id="sync-success">Currently syncing</div>
          <div id="sync-error">There was a problem syncing</div>
         </div>
      </footer>
    )
  }
}

export default Footer
