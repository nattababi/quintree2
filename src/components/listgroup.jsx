import React, { Component } from 'react';
import styles from './listgroup.module.css';

class ListGroup extends Component {
  render() {
    const menu = this.props.menu;
    const currentMenu = this.props.currentMenu;

    return (
      <div>
        <div className={styles['flex-container']}>
          <ul className={"list-group borderless"} style={{backgroundColor: "#f1f9fb"}}>
            {menu.map(menu =>
              <li style={{ maxWidth: '120px', backgroundColor: "#03A99E", cursor: 'pointer', border: 'none' }} key={menu.name} onClick={() => this.props.onItemChange(menu.name)}
                className={menu.name === currentMenu ? "list-group-item active clickable" : "list-group-item clickable"}>
                  {menu.name}</li>
            )}
          </ul>
        </div>
        <div className={styles['flex-child-menu']}>
        </div>
      </div>

    );
  }
}

export default ListGroup;