'use strict'
//  R/RN/NB components
import React from 'react'
import { Image, StatusBar } from 'react-native'
import { Container, Content, Grid, Col, Text } from 'native-base'

// additional components
import ReturnFAB from '../../components/ReturnFAB'
// styles and background image
import s from './styles'
import welcomeScreenBg from '../../../theme/img/blue-fabric.jpeg'

// redux and dispatchers
import { connect } from 'react-redux'


class CompleteTask extends React.Component {
  constructor(props){
    super(props)
    this.maxBounty = this.maxBounty.bind(this)
  }

  maxBounty(bountiesArr) {
    return bountiesArr.reduce((oldMax, newMax) => {
      return (Math.max(oldMax, newMax.amount))
    },0)
  }

  render() {
    const task = this.props.task
    const assigneeName = (task.assignee.id === this.props.viewerUser.id) ? 'You' : task.assignee.name
    const amount = this.maxBounty(task.bounties)

    return (
      <Container>
      <Image source={welcomeScreenBg} style={s.imageContainer}>
      <StatusBar hidden={true} />
      <Content contentContainerStyle={s.content} >
      <Grid style={s.grid}>
        <Col style={s.column}>
          <Text style={s.mainText}>{`${task.description} is complete! ${assigneeName} received ${amount} points.`}</Text>
        </Col>
      </Grid>
      <ReturnFAB
        goBack={this.props.navigation.goBack}
      />
      </Content>
      </Image>
      </Container>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapState = state => {
  return {
    viewerUser: state.users.viewerUser,
    task: state.tasks.selectedTask
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(CompleteTask)
