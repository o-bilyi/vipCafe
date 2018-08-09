import React from 'react';

export default class NavigationMenu extends React.Component {
  state = {
    isShowMenu : false
  };
  _showMenu = () => {
    this.setState({
      isShowMenu : !this.state.isShowMenu
    })
  };

  render() {
    const {isShowMenu} = this.state;
    return(
      <div className="menu-wrapper">
        <div className="show-hide-menu-container">
          {
           isShowMenu ?
             <button className="show-menu" onClick={this._showMenu}>///</button>
             :
             <button className="show-menu" onClick={this._showMenu}>- VIPKAFE</button>
          }
        </div>
        <ul className="menu">
          <li className="menu-item">каталог товарів</li>
          <li className="menu-item">акції і пропозиції</li>
        </ul>
      </div>
    )
  }
}