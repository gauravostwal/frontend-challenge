import * as React from 'react';
import './nav.scss';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

export interface INavBarProps extends RouteComponentProps{
  navBarLinks?: string[];
  routingLinks?: string[];
  brandName?: string;
  departmentId?: any;
  handleLinkChange?: Function;
  searchBox?: any;
}

export class NavBarImpl extends React.PureComponent<INavBarProps> {
    render() {
        const { brandName, navBarLinks, routingLinks, departmentId, history, handleLinkChange, searchBox } = this.props;
        return (<div className="navbar-container">
              <div className="Brand">{brandName}</div>
              <div className="links-main-container">
                {(navBarLinks || []).map((link, index) => {
                  return (<div className="links" key={index}>
                    <div onClick={() => handleLinkChange(routingLinks[index])} 
                      className={parseInt(departmentId) === index ? `activeClass` : `inActiveClass`}
                      style={{ cursor: 'pointer', textDecoration: 'none' }} >
                      {link}
                    </div>
                  </div>);
                })}
                {searchBox}
              </div>
        </div>);
    }
}

export const NavBar = withRouter(connect(null)(NavBarImpl));
