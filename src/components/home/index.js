import React from 'react';
import bgimage from '../../images/bg.svg';
import './style.scss'

function Home() {
  return (
    <>
      <img className="bgimage" src={bgimage} />
      <div className="container">

        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title is-1">
                Notekeeper
              </h1>
              <h2 class="subtitle">
                a better way to take notes
              </h2>
            </div>
          </div>
        </section>

        <div className="columns is ">
          <div className="column">
            <div className="card">
              <span class="icon has-text-primary">
                <i class="fa fa-archive"></i>
              </span>
            Store all your notes in a central repository for easy access and editing, no matter where you are.
            </div>
          </div>
          <div className="column">
            <div className="card">
              <span class="icon has-text-primary">
                <i class="fa fa-laptop"></i>
              </span>
            Edit your files in a modern, sleek, and out of your way interface.
            </div>
          </div>
          <div className="column">
            <div className="card">
              <span class="icon has-text-primary">
                <i class="fa fa-wpforms"></i>
              </span>
            With lots of formatting options, we have you covered no matter what kind of notes you're taking.
            </div>
          </div>
        </div>

        <br /><br /><br />

        <div className="auth-buttons">
          <button className="button">Sign In</button>
          <button className="button">Sign Up</button>
        </div>

      </div>
    </>
  )
}

export default Home;