import { useState, useEffect } from 'react';
import { octokit } from '../api';

export default function useAction(repo:string) {
   const [workflows,setWorkflows]=useState<any>([])
   useEffect(() => {
     async function onLoad() {
       await octokit.request(
        'GET /repos/{owner}/{repo}/actions/runs', {
              owner:"ncdcdev",
              repo:repo,
       }).then(res => {
           console.log(res)
           setWorkflows(res.data.workflow_runs)
        }).catch(err => console.log(err));

    }
    onLoad();
},[])

return {
   workflows
    }
};