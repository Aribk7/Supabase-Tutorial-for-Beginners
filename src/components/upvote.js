import React, { useState } from "react";

import { Button, ButtonGroup, Image, Box } from "@chakra-ui/react";

import { Triangle } from "react-feather";

import { supabase } from "../supabaseClient.js";

export default function Card({ book }) {
  const [loading, setLoading] = useState(false);
  const [upvotes, setUpvotes] = useState(book.Upvotes);


  function refreshPage() {
    window.location.reload(false);
  }

  const handleUpvote = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Book")
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
        <p className='title'>{book.Title}</p>
        <p className='author'>{book.Bio}</p>
      </div>
      <div className='upvote'>
        <Triangle color='#3182ce' size={25} onClick={handleUpvote} />
        <p className='upvotes-number'>{upvotes}</p>
      </div>
    </div>
  );
}
