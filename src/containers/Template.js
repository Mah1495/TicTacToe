import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer'
import { Header, Main } from '../styled/Template'

injectTapEventPlugin();

class Template extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavDrawer />
                    <Header>
                        TicTacToe
                    </Header>
                    <Main>
                        {this.props.children}
                    </Main>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Template;