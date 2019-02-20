import React, { Component } from 'react'
import Button from './Button'
import Input from './Input'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    const {handleSearch, handleCreate} = this.props
    return (
      <form>
        <Button primary onClick={handleCreate}>Create</Button>
        <Input
          onChange={handleSearch}
          ref={this.inputRef}
          placeholder="Search ..."
          onMouseEnter={() => {
            this.inputRef.current.focus()
          }} />
      </form>
    )
  }
}