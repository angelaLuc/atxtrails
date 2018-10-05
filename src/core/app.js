import React, { Component } from 'react';
import UrbanTrails from '../trails/urban-trails';

class App extends Component {
    render () {
        return (
            <div data-testid='app-wrapper' className='container-fluid no-padding'>
                <nav className={'app-title'} title={'v1.0.1'}>Urban Trails (Austin, TX) - 2015</nav>
                <div className={'app'}>
                    <UrbanTrails />
                </div>
            </div>
        );
    }
}

export default App;
