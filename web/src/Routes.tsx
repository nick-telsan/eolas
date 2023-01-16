import { Router, Route, Set, Private } from '@redwoodjs/router'

import { DefaultLayout } from 'src/components/structures/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home">
        <Set wrap={DefaultLayout}>
          <Private unauthenticated="home" roles="admin">
            <Route path="/admin" page={AdminPage} name="admin" />
          </Private>
          <Route path="/create" page={CreatePage} name="create" />
          <Route path="/compare" page={ComparePage} name="compare" />
          <Route path="/view" page={ViewPage} name="view" />
          <Route path="/index" page={IndexPage} name="index" />
        </Set>
      </Private>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
