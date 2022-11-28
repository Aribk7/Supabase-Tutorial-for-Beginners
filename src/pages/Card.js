import React, { useState } from "react";

import { Button, ButtonGroup, Image, Box } from "@chakra-ui/react";

import { supabase } from "../supabaseClient.js";

export default function Card({ book }) {
  const [loading, setLoading] = useState(false);
  const [upvotes, setUpvotes] = useState(book.Upvotes);

  // const handleUpvote = async () => {
  //   const { data, error } = await supabase
  //     .from("book")
  //     .update({ Upvotes: upvotes + 1 })
  //     .eq("id", book.id)
  //     .single();
  //   if (error) {
  //     console.error(error);
  //   }
  //   setUpvotes(data.is_complete);
  // };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleUpvote = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("")
        .update({ Upvotes: upvotes + 1 })
        .eq("id", book.id)
        .single();
      if (error) throw error;
      setUpvotes(data.Upvotes + 1);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
      refreshPage();
    }
  };
  return (
    <div className='card'>
      <Image
        boxSize='100px'
        objectFit='contain'
        src={book.Image}
        alt='pic of book'
      />

      <div className='info'>
        <text className='title'>{book.Title}</text>
        <text className='author'>{book.Bio}</text>
      </div>
      <div className='upvote'>
        <Button colorScheme='orange' size='sm' onClick={handleUpvote}>
          Upvote
        </Button>
        <p className='upvotes-number'>{upvotes}</p>
      </div>
    </div>
  );
}