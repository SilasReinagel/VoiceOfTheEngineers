<script>
  import Container from '../Elements/TightContainer.svelte';
</script>

<Container>
  <section class="center-vh">
    <div>
      <h1>Our Vision</h1>
        <h3><b>Voice</b> is a social project designed to empower EVERY employee to refine 
          and actualize grassroots projects in order to provide major business value and transformation. Make YOUR brilliant suggestion heard today!</h3>

        <img src="/images/steve-jobs-quote-1.jpg" alt="Steve Jobs Quotes" class="center"/>

        <p>As companies become successful, they typically become larger. Larger companies can have a bigger impact on the world, 
          but often the growing means that some of the great cultural elements that were present when the company was smaller get lost in the mix.</p>
  
        <p>We value <b>passionate feedback, social cohesion, continuous improvement, and true company agility.</b>
          <b>Voice</b> is a project that is intended to keep these values possible in a large company that necessarily has more units, more disconnection, and more bureaucracy.
        </p>
  
        <h3>Social Support</h3>
        <p>The core concept of Voice is that passionate and innovative members should be able to rally social support around 
          ideas that would be highly beneficial to their company, their customers, and their coworkers. Ideas that have strong social support have a 
          compelling reason for prioritization by management, since they represent huge value adds for the company. Ideas that aren't 
          very popular will naturally fall off the radar, as innovators can easily see that other ideas are more compelling.</p>
  
        <h3>Ideas > People</h3>
        <p>The secondary concept of Voice is that the ideas are king. We don't care about job titles, cliques, silos, or anything else. Ideas 
          stand or die on their own merits and pitch, not based on political standing of their originators or advocates. To make this possible, all suggestions 
          and upvotes are stored anonymously and stripped of all user information. Your privacy is key. Your ideas are valuable!</p>
          
        <h2>What change are you <b>LONGING</b> to see at your company? It can become a reality!</h2>
    </div>
  </section>
</Container>

<style>
  section {
    padding: 1em;
    min-height: 83vh;
  }

  div {
    max-width: 44em;
    display: flex;
    flex-direction: column;
  }

  img {
    max-width: 24em;
  }

  h1, 
  h2, 
  h3, 
  p {
    letter-spacing: -1px;
  }

  h3 {
    line-height: 1.3em;
  }

  p {
    color: #ddd;
    font-size: 0.9em;
  }
</style>