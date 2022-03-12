import React , { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {todotitle: '',datenow : new Date(),tododate:'',todoId: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.items = JSON.parse(window.localStorage.getItem('MyTodo'));
    this.items = ( this.items == null ? [] : this.items);
    this.groupItems = GroupItem(this.items);
  }

  handleChange(event) { 
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value,
          id = event.target.id;
    if (event.target.type === 'checkbox' ) {
      event.target.parentNode.classList.toggle('line-through');
      const editItem = this.items.find(e => e.id == id);
      editItem.check = val;
      window.localStorage.setItem('MyTodo', JSON.stringify(this.items));
    } 
    this.setState({
      [event.target.name]: val,
    });  

  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.state.todoId = this.items.length;
    if ( this.state.todotitle !== '') {
        this.items.push({id:this.state.todoId, title: this.state.todotitle , date: this.state.tododate, check : false });
        this.items.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }
    this.groupItems = GroupItem(this.items);
    window.localStorage.setItem('MyTodo', JSON.stringify(this.items));
    this.state.todotitle = this.state.tododate = '';
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
      datenow: new Date()
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
              <label className='text-xs text-gray-400 mr-1'>Todo Itemes : <span id='items'> {Object.keys(this.items ).length} / {Object.keys(this.groupItems ).length} </span></label>
            </div>
          </form>
          <h6 className='text-center font-semibold text-gray-400  mb-2'>Todo Liste: </h6>
          <ul id='todo-liste' className='bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6'> 
            {Object.keys(this.groupItems).map((keyName, i) => (
                <li key={i} className='hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm'>
                  <div className='group-hover:text-white font-semibold text-slate-900 mb-2'>{keyName}</div>
                  { this.groupItems[keyName].map((item,gIndex) =>
                  <Additem todoid={item.id} todoitem={item.title} todocheck={item.check} todochange={this.handleChange} />)}
                </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// Function to add a new todo item

function Additem(props) {
  const inputProps = {
    type: 'checkbox',
    name: 'todocheck',
    id: props.todoid,
    onChange: props.todochange,
    className: 'mr-1',
  };
  
  if( props.todocheck) 
    inputProps.checked = 'checked'

  return(
    <div className={ props.todocheck ? 'line-through' : null}>
      <input 
        {...inputProps}
      /> 
      <label 
        htmlFor= {props.todoid}
      > 
        {props.todoitem} 
      </label>
    </div>
  )
}

// Function to group items with

function GroupItem(items){
  const groupItems = items.reduce((catsSoFar, { date, title , check , id }) => {
    if (!catsSoFar[date]) catsSoFar[date] = [];
    catsSoFar[date].push({title : title , check : check , id : id});
    return catsSoFar;
  }, {});
  return groupItems;
}

export default App;
