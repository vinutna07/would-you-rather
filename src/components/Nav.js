import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    handleLogout =(e)=>{
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
    }
    render() {
        return (
            <div className='nav'>
                <div><NavLink to='/' exact activeClassName='active' className="text-info"><b>Home</b></NavLink></div>
                <div><NavLink to='/add' exact activeClassName='active' className="text-info"><b>New Question</b></NavLink></div>
                <div><NavLink to='/leaderboard' exact activeClassName='active' className="text-info"><b>Leader Board</b></NavLink></div>
                {this.props.authedUser !== null ?
                    <span className='logged-in'>
                        <div>
                            Hello, {this.props.name}
                        </div>
                        <div><NavLink to='/' exact onClick={this.handleLogout} className="text-info"><b>Logout</b></NavLink></div>
                    </span> : <span></span>}
            </div>
        )
    }
}

function mapStateToProps({ users }, { authedUser }) {
    const userName = users[authedUser]
    const name = userName ? userName.name : null
    return {
        authedUser,
        users,
        name
    }
}
export default connect(mapStateToProps)(Nav)