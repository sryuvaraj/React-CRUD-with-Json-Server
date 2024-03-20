import { Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Axios } from 'axios';
import MembersList from './Components/MembersList';
import CreateMember from './Components/CreateMember';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [members, setMembers] = useState([])

  return (
    <>
    <div>
      <ul className='bg-danger py-3' style={{display:"flex"}}>
        <li className='px-3' style={{listStyle:"none"}}><button className='btn btn-light'><Link className='text-primary' style={{textDecoration:"none"}}to ="/">MembersList</Link></button></li>
        <li className='px-3' style={{listStyle:"none"}}><button className='btn btn-success'><Link className='text-white' style={{textDecoration:"none"}}to ="/createMember">Create Member</Link></button></li>
      </ul>
      <Routes>
        <Route path='/' element={<MembersList  members={members} setMembers={setMembers}/>}></Route>
        <Route path='/createMember' element={<CreateMember members={members} setMembers={setMembers}/>}></Route>
      </Routes>
    </div>
    </>
  );
}

export default App;
