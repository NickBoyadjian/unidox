import React from 'react';
import bgimage from '../../images/bg.svg';
import './style.scss'
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();

  return (
    <div className="home">
      <img className="bgimage" src={bgimage} alt="" />
      <div className="container">

        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title is-1">
                Unidox
              </h1>
              <h2 class="subtitle">
                a better way to take notes
              </h2>
            </div>
          </div>
        </section>

        <div className="columns main-content">
          <div className="column">
            <div className="card">
              <span class="icon has-text-link">
                <i className="fa fa-archive"></i>
              </span>
            Store all your notes in a central repository for easy access and editing, no matter where you are.
            </div>
          </div>
          <div className="column">
            <div className="card">
              <span class="icon has-text-link">
                <i className="fa fa-laptop"></i>
              </span>
            Edit your files in a modern, sleek, and out of your way interface that works just as well on mobile devices as the desktop.
            </div>
          </div>
          <div className="column">
            <div className="card">
              <span class="icon has-text-link">
                <i className="fa fa-wpforms"></i>
              </span>
            With a variety of formatting options, we have you covered no matter what kind of notes you're taking.
            </div>
          </div>
        </div>

        <br /><br /><br />

        <div className="auth-buttons">
          <button
            className="button is-link"
            onClick={() => history.push("/")}>Sign In</button>
          <button
            className="button"
            onClick={() => history.push("/signup")}>Sign Up</button>
        </div>

      </div>
    </div>
  )
}

export default Home;