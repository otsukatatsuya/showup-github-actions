import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useAction from './hooks';
import { octokit } from './api';

function App() {
  const [repoName,setRepoName]=useState("teamplanet-admin")
  const [workflows,setWorkflows]=useState<any>([])
  const [num,setNum]=useState<any>()
  useEffect(() => {
    async function onLoad() {
      await octokit.request(
       'GET /repos/{owner}/{repo}/actions/runs', {
             owner:"ncdcdev",
             repo:repoName
      }).then(res => {
          console.log(res)
          setWorkflows(res.data.workflow_runs)
          setNum(res.data.total_count)
       }).catch(err => {
        setNum(null)
         setWorkflows([])
        })

   }
   onLoad();
},[repoName])

  //const {workflows}=useAction(repoName)
  
  return (
    <div className="App">
      <h1>github actions</h1>
      <h2>{num || "-"} Actions</h2>
      <input value={repoName} onChange={e=>setRepoName(e.target.value)} />
      {
        workflows[0]&&workflows.map((d:any)=>(
          <p key={d.run_number}>
            <a href={d.html_url} target="_blank" >#{d.run_number}</a>
             {" was"} 
             <span style={{color:d.conclusion==="failure"?"red":"blue"}} > {d.conclusion}</span> 
             {" with"} <span style={{fontWeight:600}} >{d.name}</span>
          </p>
        ))
      }
      {
        !workflows[0] && <><br/>no data</>
      }
    </div>
  );
}

export default App;
