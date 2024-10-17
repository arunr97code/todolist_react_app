function SearchTask({search, setSearch}){
    return(
        <form id='form2' onSubmit={(e) => e.preventDefault()}>
            <input type="text" 
            placeholder="Search task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        </form>
    )
}
export default SearchTask