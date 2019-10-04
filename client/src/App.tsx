import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import React from 'react';

const App: React.FC = () => {
  const { data, loading } = useQuery(
    gql`
    {
      Greetings
    }
    `
  )
  if (loading)
    return (
      <div>
        Loading...
    </div>
    )

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default App;
