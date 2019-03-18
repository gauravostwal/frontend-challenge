import * as React from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends React.PureComponent {
    render() {
        return (<div style={{ display: 'flex', height: '40px', fontSize: '14px', alignItems: 'center' }}>
            <Link to="/" style={{ cursor: 'pointer', width: '50px', border: 'solid 2px' }}>Home</Link>
            <Link to="/aboutus"
                style={{ cursor: 'pointer', width: '50px', border: 'solid 2px', marginLeft: '21px' }}>
                About Us
            </Link>
        </div>);
    }
}
