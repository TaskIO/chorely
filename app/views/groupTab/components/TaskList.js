'use strict'
import React from 'react'
import { Text, Button, Container, Content, List, ListItem, Body, Title } from 'native-base'
import { connect } from 'react-redux'
import { fetchGroupTasks, addSelectedTask } from '../../../redux/reducers/tasks'

class TaskList extends React.Component {
  constructor() {
    super()
    this.state = {
      status: 'Pending',
    }
    this.toggleStatus = this.toggleStatus.bind(this)
  }
  componentDidMount() {
    this.props.fetchGroupTasks()
  }
  toggleStatus(status) {
    if (status !== this.state.status) this.setState({status})
  }
  render() {
    const groupTasks = this.props.groupTasks.filter(task => task.status === this.state.status)
    const statuses = ['Pending', 'Active', 'Completed']
    const setSelectedTask = this.props.addSelectedTask
    const navigate = this.props.navigate
    return (
      <Container>
        <Content>
          <Body style={{justifyContent: 'center', flexDirection: 'row'}}>
            {statuses.map(status => {
              return (
                <Button key={status} onPress={() => this.toggleStatus(status)}>
                  <Text>{status}</Text>
                </Button>
              )
            })}
          </Body>
          <List style={{flex: 1, flexDirection: 'column'}}>
            <ListItem>
              <Text>{this.state.status} Tasks:</Text>
            </ListItem>
            {groupTasks.length ? groupTasks.map(task => {
              return (
                <ListItem key={task.id}>
                  <Button
                    transparent
                    onPress={() => {
                      setSelectedTask(task)
                      navigate('SingleTask')
                    }}
                    >
                    <Text>{task.description}</Text>
                  </Button>
                </ListItem>
              )
            }) : <Text>No {this.state.status} Tasks</Text>}
          </List>
        </Content>
      </Container>
    )
  }
}

export default connect(
  state => {
    return {
      groupTasks: state.tasks.groupTasks,
    }
  },
  dispatch => {
    return {
      fetchGroupTasks: (groupId = 1) => {
        dispatch(fetchGroupTasks(groupId))
      },
      addSelectedTask: selectedTask => {
        dispatch(addSelectedTask(selectedTask))
      }
    }
  }
)(
  TaskList
)
