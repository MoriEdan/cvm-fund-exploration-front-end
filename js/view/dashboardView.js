import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import IndicatorsView from './indicatorsView';
import FundListView from './fundList';
import FundComparisonView from './fundComparison';

const drawerWidth = 270;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
});

const routes = [
    {
        path: '/',
        name: 'Indicadores',
        exact: true,
        icon: () => (<ShowChartIcon />),
        main: (props, classes) => <IndicatorsView {...props} classes={classes} />
    },
    {
        path: '/fundList',
        name: 'Lista de Fundos',
        icon: () => (<TableChartIcon />),
        main: (props, classes) => <FundListView {...props} classes={classes} />
    },
    {
        path: '/fundComparison',
        name: 'Comparação de Fundos',
        icon: () => (<ScatterPlotIcon />),
        main: (props, classes) => <FundComparisonView {...props} classes={classes} />
    }
];

const MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <Link to={to} style={{ textDecoration: 'none' }}>
                <ListItem button selected={match ? true : false}>
                    <ListItemIcon>
                        {icon()}
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
            </Link>
        )}
    />
);

class Dashboard extends React.Component {
    state = {
        open: true
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <Router>
                <React.Fragment>
                    <CssBaseline />
                    <div className={classes.root}>
                        <AppBar
                            position="absolute"
                            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(
                                        classes.menuButton,
                                        this.state.open && classes.menuButtonHidden,
                                    )}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" noWrap className={classes.title}>Explorador de Investimentos</Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="permanent"
                            classes={{
                                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                            }}
                            open={this.state.open}>
                            <div className={classes.toolbarIcon}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                {routes.map((route, index) => (
                                    <MenuLink activeOnlyWhenExact={route.exact} to={route.path} label={route.name} icon={route.icon} key={index} />
                                ))}
                            </List>
                            <Divider />
                        </Drawer>
                        <main className={classes.content}>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(props) => route.main(props, classes)}
                                />
                            ))}
                        </main>
                    </div>
                </React.Fragment>
            </Router>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

module.exports = withStyles(styles)(Dashboard);