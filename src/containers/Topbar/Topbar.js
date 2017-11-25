import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import appActions from '../../redux/app/actions';
import TopbarWrapper from './topbar.style';
import {
    TopbarMail,
    TopbarNotification,
    TopbarMessage,
    TopbarSearch,
    TopbarUser,
    TopbarAddtoCart
} from '../../components/topbar';
import {Link} from 'react-router-dom';
import {Timer} from "../../Timer";

const {Header} = Layout;
const {toggleCollapsed} = appActions;

class Topbar extends Component {
    state = {};

    render() {
        Timer.onSecond = (t) => this.setState({time: t});
        const {toggleCollapsed, url, customizedTheme, locale} = this.props;
        const collapsed = this.props.collapsed && !this.props.openDrawer;
        const styling = {
            background: customizedTheme.backgroundColor,
            position: 'fixed',
            width: '100%',
            paddingLeft: "0",
            height: 70
        };
        let linkS = {
            fontFamily: "Lato",
            fontSize: "26px",
            fontWeight: 300,
            letterSpacing: "2.6px",
            color: "#182345",
            margin: "0 14px 0 14px",
            textTransform: "uppercase",
            borderBottom: "solid 2px #182345"
        };
        console.log(url);
        return (
            <TopbarWrapper>
                <Header
                    style={styling}
                    className={
                        true ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
                    }
                >

                    <div className="isoLeft" style={{width: "100%"}}>
                        <div style={{
                            position: "absolute",
                            fontFamily: "Lato",
                            letterSpacing: "2px",
                            fontSize: "20px",
                            color: "white",
                            marginLeft: "20px",
                            lineHeight: "69px"
                        }}>
                            INTERVIEW +
                        </div>
                        <div id="logoBack" style={{
                            borderTop: "69px solid #182345",
                            borderLeft: "0 solid transparent",
                            borderRight: "50px solid transparent",
                            height: 0,
                            width: "250px"
                        }}/>
                        <div style={{width: "100%", position: "absolute", textAlign: "center", margin: "auto"}}>
                            {url == "/employer" ? <div>
                                <span style={{fontSize: "20px",}}>MINUTES LEFT</span>
                                <span
                                    style={{fontSize: "40px",}}>{this.state.time ? (Math.floor(this.state.time / 60) + ":" + this.state.time % 60) : null}</span>
                            </div> : (<div>
                                <Link to={`${url}/myForms`}>
                                <span className="isoMenuHolder" style={linkS}>
                                    <span className="nav-text">
                                      My Forms
                                    </span>
                                  </span>
                                </Link>
                                <Link to={`${url}/myForms`}>
                                  <span className="isoMenuHolder" style={linkS}>
                                    <span className="nav-text">
                                      Apps
                                    </span>
                                  </span>
                                </Link>
                            </div>)}

                        </div>
                    </div>
                    <ul className="isoRight">

                        <li
                            onClick={() => this.setState({selectedItem: 'user'})}
                            className="isoUser"
                        >
                            <TopbarUser locale={locale}/>
                        </li>
                    </ul>
                </Header>
            </TopbarWrapper>
        );
    }
}

export default connect(
    state => ({
        ...state.App.toJS(),
        locale: state.LanguageSwitcher.toJS().language.locale,
        customizedTheme: state.ThemeSwitcher.toJS().topbarTheme
    }),
    {toggleCollapsed}
)(Topbar);
