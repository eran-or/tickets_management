import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Ticket from './Ticket';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display:flex;
  flex-direction:column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TicketList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow:1;
  min-height:100px;
`;

export default class Column extends React.Component {
  render() {
    const { column, tickets, handleEdit } = this.props
    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <TicketList 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
              {tickets.map((ticket, index) =>(
                <div key={ticket.id} onClick={()=>handleEdit(ticket)}>
                  <Ticket ticket={ticket} index={index} />
                </div> 
              ))}
              {provided.placeholder}
            </TicketList>
          )}
        </Droppable>
      </Container>
    );
  }
}