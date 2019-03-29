import * as React from 'react';
import './nav.scss';
import { connect, DispatchProp } from 'react-redux';
import { IHistory } from '../../../interfaces';

export interface INavBarProps {
  navBarLinks?: string[];
  routingLinks?: string[];
  brandName?: string;
  departmentId?: any;
}

export class NavBar extends React.PureComponent<INavBarProps> {
    render() {
        const { brandName, navBarLinks, routingLinks, departmentId } = this.props;
        return (<div className="navbar-container">
              <div className="Brand">{brandName}</div>
              <div className="links-container">
                {(navBarLinks || []).map((link, index) => {
                  return (<div className="links" key={index}>
                    <a href={routingLinks[index]} 
                      className={parseInt(departmentId) === index ? `activeClass` : `inActiveClass`}
                      style={{ cursor: 'pointer', textDecoration: 'none' }} >
                      {link}
                    </a>
                  </div>);
                })}
                
              </div>
        </div>);
    }
}
