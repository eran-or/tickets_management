import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Rip = styled.div`
  height: 20px;
  margin: 0 10px;
  background-color: #fff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==);
  background-size: 4px 2px;
  background-repeat: repeat-x;
  background-position: center;
  position: relative;
  box-shadow: 0 1px 0 0 #fff, 0 -1px 0 0 #fff;
  &:before,
  &:after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      border: 5px solid transparent;
      border-top-color: #fff;
      border-right-color: #fff;
      border-radius: 100%;
      pointer-events:none;
      box-sizing:content-box;
  }
  &:before {
      left: -10px;
  }
  &:after {
      transform: translate(-50%, -50%) rotate(225deg);
      right: -40px;
  }`

const Container = styled.div`
  width: 255;
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
  margin-bottom:8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : null)};
`
const Spacer = styled.div`
 padding: 20px;
 background: ${props => (props.isDragging ? 'lightgreen' : 'white')};
 border-top-right-radius:${props=>(props.top)?'15px':null};
 border-top-left-radius:${props=>(props.top)?'15px':null};
 border-bottom-left-radius:${props=>(props.bottom)?'15px':null};
 border-bottom-right-radius:${props=>(props.bottom)?'15px':null};
`
export default class Ticket extends Component {
  render() {
    const {ticket, index} = this.props
    return (
      <Draggable draggableId={ticket.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            >
            <Spacer top>
              {ticket.summery}
              {ticket.id}
            </Spacer>
            <Rip />
            <Spacer bottom />
          </Container>
        )}
      </Draggable>
    )
  }

}