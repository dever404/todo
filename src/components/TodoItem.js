import React from 'react';

function Additem(props) {
    return(
      <li>
      <input 
        type="checkbox"  
        name="todotitle" 
        value={props.todoitem} 
        onChange={this.handleChange} 
      />
      <span class='text-xs text-gray-400' >
        { props.tododate }
      </span>
    </li>
    )
  }
  
  export default Additem;