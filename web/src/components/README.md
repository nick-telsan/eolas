# Components

Redwood is VERY opinionated about its components. And I don't like it.

So, in this directory, you'll find three subdirectories: `ui`, `cells`, and `structures`.

`ui` is for dumb, singular components. They shouldn't do any queries or mutations.
`cells` is for Redwood data loading cells.
`structures` is for more complex components that might do some mutations or queries.

Think of it like this:
`ui` components are used to build `structures` and `structures` are used to display data in `cells`

While I really like data loading cells and the idea of them, Redwood's insistence on them is really annoying.
