import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ticketsReorder, setMode, updateTickets, updateColumns } from '../redux/actions'
//import { sortByStatus } from '../helpers/sortByStatus'
import Form from './Form'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import Modal from './Modal'
import { Input, FormGroup } from 'reactstrap';

class Home extends Component {
  state = {
    searchText: '',
    create: '',
    ticket:{}
  }
  onDragStart = result => {
    const { tickets } = this.props
    this.setState({ticket:tickets[result.draggableId]})
  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    const { columns, ticketsReorder, tickets, updateTickets } = this.props
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    
    const finishColumn = columns[destination.droppableId];
    let newState;
    if (startColumn === finishColumn) {
      const newTicketIds = Array.from(startColumn.ticketIds);
      newTicketIds.splice(source.index, 1);
      newTicketIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...startColumn,
        ticketIds: newTicketIds,
      };
      newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };
    } else {
      // Moving from one list to another
      const startTicketIds = Array.from(startColumn.ticketIds);
      
      startTicketIds.splice(source.index, 1);
      const newStart = {
        ...startColumn,
        ticketIds: startTicketIds,
      }

      const finishTicketIds = Array.from(finishColumn.ticketIds);
      finishTicketIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finishColumn,
        ticketIds: finishTicketIds,
      }

      const {ticket} = this.state
      ticket.status = newFinish.title
      updateTickets({
        ...tickets,
        [ticket.id]:ticket
      })

      newState = {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    ticketsReorder(newState)

  };

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value })
  }

  handleCreate = () => {
    const { setMode } = this.props
    setMode('create')
  }

  handleEdit = (ticket) => {
    const { setMode } = this.props
    this.setState({
      ticket
    })
    setMode('update')
  }

  updateTickets = () => {
    const { tickets, updateTickets, setMode, columns, newTicketsContainer, updateColumns } = this.props
    const { ticket } = this.state
    console.log(ticket)
    if(setMode === 'create'){
    const length = Object.keys(tickets).length + 1
    ticket.id = `ticket-${length}`
    ticket.ctreatedAt = new Date()
    
    updateTickets({
      ...tickets,
      [ticket.id]:ticket
    })
    const column = columns[newTicketsContainer]
    const newTicketIds = [...column.ticketIds, `ticket-${length}`]

    updateColumns({
      ...columns,
      [newTicketsContainer]:{
        ...column,
        ticketIds:newTicketIds
      }
    })
    return
  }
  ticket.udatedAt = new Date()
  updateTickets({
    ...tickets,
    [ticket.id]:ticket
  })

    setMode('')
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    const { ticket } = this.state
    let errorText = ""
    
    if (value === '') {
      errorText = "empty fields are not allowed!"
    }
    this.setState({ ticket:{ ...ticket, [name]: value}, errorText })
  }

  render() {
    const { columnOrder, columns, tickets, selectedMode, setMode } = this.props
    const { ticket } = this.state
    const createTicketModal = (<form>
      <div className="form-row">
        <label className="col">
          Summery:
          <input className="form-control" type="text" name="summery" value={ticket.summery || ''} onChange={this.handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label className="col">
          Description:
          <input className="form-control" type="text" name="description" value={ticket.description || ''} onChange={this.handleChange} />
        </label>
      </div>
      <div className="form-row">
      <FormGroup>
        <label className="col">
          Status:
          <Input type="select" name="status" id="status" value={ticket.status || ''} onChange={this.handleChange}>
            <option>Open</option>
            <option>In-Progress</option>
            <option>Done</option>
          </Input>
        </label>
      </FormGroup>
      <FormGroup>
        <label className="col">
          Severity:
          <Input type="select" name="severity" id="severity" value={ticket.severity || ''} onChange={this.handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Input>
        </label>
      </FormGroup>
      </div>
    </form>)
    return (
      <div>
        <div className="d-flex justify-content-around">
          <Form handleSearch={this.handleSearch} handleCreate={this.handleCreate} />
        </div>
        <div className="d-flex justify-content-around">
          <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
            {columnOrder.map(columnId => {
              const column = columns[columnId];
              const { searchText } = this.state
              const list = column.ticketIds.reduce((acc, ticketId) => {
                const textInSummery = tickets[ticketId].summery.toLowerCase().includes(searchText.toLowerCase())
                const textInDescription = tickets[ticketId].description.toLowerCase().includes(searchText.toLowerCase())
                if (searchText === '' || textInSummery || textInDescription) {
                  acc.push(tickets[ticketId])
                }
                return acc
              }, [])
              return <Column key={column.id} column={column} tickets={list} handleEdit={this.handleEdit} />;
            })}
          </DragDropContext>
        </div>
        <Modal isOpen={selectedMode} toggle={() => setMode("")} footer={{ action: this.updateTickets, actionText: "OK" }}>
        {createTicketModal}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  columns: state.columns,
  columnOrder: state.columnOrder,
  selectedMode: state.selectedMode,
  newTicketsContainer: state.newTicketsContainer
})

const mapDispatchToProps = dispatch => ({
  ticketsReorder: (columns) => dispatch(ticketsReorder(columns)),
  updateTickets: (tickets) => dispatch(updateTickets(tickets)),
  setMode: (mode) => dispatch(setMode(mode)),
  updateColumns: (columns) => dispatch(updateColumns(columns)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)