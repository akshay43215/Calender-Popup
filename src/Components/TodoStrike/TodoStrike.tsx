
import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react'
import "./TodoStrike.css"

interface itemsType {
    id: number
    val:string
    checked: boolean
}

function TodoStrike() {
const [txtContent, settxtContent] = useState('')
const [check, setCheck] = useState(false)
const [items, setItems] = useState<itemsType[]>([])
   
    const formSub =(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        console.log('form fn',txtContent,'addclick');
        setItems([...items, {id:new Date().getTime(), val:txtContent,checked :check} ]);
    }

  return (
    <div className='todo-container'>
        <form action="" onSubmit={formSub}>
            <input type='text' onChange={(e)=> {settxtContent(e.target.value)}} />
        </form>
        
        <ul>
            {items.map((itm) => {

                const id =itm.id ;
                console.log(check);
                

                return (
                    <div key={id} className='todo-map'>
                        <span style={{textDecoration:itm.checked ?'lineThrough':'none' }}>
                             {itm.val}  
                        </span>
                        <input type="checkbox" onChange={(e)=>setCheck(e.target.checked)} />
                        {/* <button onClick={ ()=>{strikeItm(id,check)} }> Strike </button> */}
                    </div>
                )
            })
            }
        </ul>
        {/* <h3>{txtContent}</h3> */}
    </div>
  )
}

export default TodoStrike ;

