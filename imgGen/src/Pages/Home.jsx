import React from 'react'
import { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../Components'



const RenderCards = ({data, title}) => {
  
  if(data?.length > 0) {//the ?. is called optional chaining operator it prevents crashing when the data is not available(when data is null or undefined)
    return data.map((post) => <Card key={post._id} {...post}/>);
  }
  return (
    <h2 className='mt-5 font-bold text-[#666e75] text-xl uppercase'>
      {title}
      </h2>
  )
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText,setSearchText]=useState('');
  const [searchedResults,setSearchedResults]=useState(null);
  const [searchTimeout,setSearchTimeout]=useState(null);

  //Will only be called at the start when the component loades
  useEffect(()=>{
      const fetchPosts=async()=>{
        setLoading(true);

        try {
          const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
            },
          })
          
          //Check
          if(response.ok){
            const result=await response.json();

            setAllPosts(result.data.reverse()); 
            //as we want latest posts on the top...
          }

        } catch (error) {
          alert(error);
          
        }finally{
          setLoading(false);
        }
      }
      fetchPosts(); //Immedialty called the fucntion...
    },[]);


    const handleSearchChange=(e)=>{
      clearTimeout(searchTimeout);

      setSearchText(e.target.value);

      setSearchTimeout(
        setTimeout(()=>{
          const searchResults= allPosts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

          setSearchedResults(searchResults);
      },400)
     );
    }


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-black text-[32px]'>The community showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w [500px]'>
          Browse through a collection of imaginative and visially stunning images generated by pollination
        </p>
      </div>

      <div className='mt-16'>

        <FormField 
        labelName="Search posts"
        type="text"
        name="text"
        placeholder="Search posts"
        value={searchText}
        handleChange={handleSearchChange}
        />
      </div>


      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center item-center'>
            <Loader/>
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults || []}
                  title="No search results found"
                />
              ) : (
                <RenderCards
                  data={allPosts || []}
                  title="No posts found"
                />
              )}
            </div>
          </>
        )}
      </div>

    </section>

  )
}

export default Home