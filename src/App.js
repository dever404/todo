import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {todotitle: '',datenow : new Date(),tododate:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.items = JSON.parse(window.localStorage.getItem('MyTodo'));
  }

  handleChange(event) { 
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (event.target.type === 'checkbox' ) {
      event.target.parentNode.classList.toggle('line-through');
    }
        
    this.setState({
      [event.target.name]: val,
    });  
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if ( this.state.todotitle !== '') {
        this.items.push({ title: this.state.todotitle , date: this.state.tododate, checkChange : this.handleChange });
        this.items.sort((a, b) => (a.date > b.date) ? 1 : -1)
    }
    this.state.todotitle = this.state.tododate = '';

    window.localStorage.setItem('MyTodo', JSON.stringify(this.items));

  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="flex flex-col h-screen">
        <span className="text-xs inline-block mb-2 py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white">
          { this.state.datenow.toLocaleString("fr-FR",{weekday: "long", year: "numeric", month: "long", day: "numeric",hour: "2-digit",minute: "2-digit"}) }
        </span>
        <div className="max-w-2xl my-auto  mx-auto rounded-xl shadow-lg">
          <form onSubmit={this.handleSubmit} className='px-10 pt-5 pb-0'>
            <label htmlFor="todotitle" className="text-sm text-gray-400 mr-3">Add New Todo : </label>
            <input 
              type="text" 
              id="todotitle"
              name="todotitle" 
              className="mb-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-sm leading-6 text-gray-900 placeholder-gray-300 rounded-md py-1 px-4 ring-1 ring-gray-200 shadow-sm"
              placeholder="My Todo" 
              required='required'
              value={this.state.todotitle} 
              onChange={this.handleChange} 
            />
            <input 
              type="date" 
              id="tododate"
              name="tododate" 
              className="mb-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-sm leading-6 text-gray-900 placeholder-gray-300 rounded-md py-1 px-4 ring-1 ring-gray-200 shadow-sm"
              placeholder="Todo Date" 
              required='required'
              value={this.state.tododate} 
              onChange={this.handleChange} 
            />
            <div className='flex flex-row justify-between items-center'>
              <input 
                type='submit' 
                value="+ Add to liste" 
                className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-1 shadow-sm cursor-pointer mb-3"
              />
              <label className='text-xs text-gray-400 mr-1'>Todo Itemes : <span id='items'> { this.items.length } </span></label>
            </div>
          </form>
          <div className='bg-slate-50 px-10 pb-8'>
            <div className="w-full h-px bg-gray-200 my-6"></div>
            <h6 className='text-center font-semibold text-gray-400  mb-2'>Todo Liste: </h6>
            <ul id='todo-liste'> 
              { this.items.map((item,index) => 
                <Additem todoid={index} todoitem={item.title} tododate={item.date} todochange={item.checkChange} />  
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

// Function to add a new todo item

function Additem(props) {
  return(
    <li>
      <input 
        type='checkbox' 
        name='todocheck' 
        id= {props.todoid}
        value={props.todoitem} 
        onChange={props.todochange} 
        className='mr-1'
      /> 
      <label 
        htmlFor= {props.todoid}
      > 
        {props.todoitem} 
        <span className='text-xs text-gray-400 ml-1' >
          ({ props.tododate })
        </span>
      </label>
    </li>
  )
}

export default App;
