<script>
  export let company;

  import Container from '../Elements/Container.svelte';
</script>

<section>
  <Container>
    <div class="mobile-three-column-layout">
      <div class="column">
        <h2>Contact Us</h2>
        <h4>{company.name}</h4>
        <p>{company.address.line1}
          <br>{company.address.city}, {company.address.state}, {company.address.zip5}
          <br>Phone: {company.phone}
          <br>Map: <a href={company.address.mapLink}>MapQuest</a></p>
        <hr/>
        <div class="logo-box">
          <img src={company.logo} alt="{company.name} Logo" />
        </div>
      </div>
      <div class="column vertical">
        <h2>Social & Web</h2>
        <a href={company.social.yelp}><img class="yelp" src="../images/yelp-rectangle.png" alt="Yelp Icon"/></a>
        <div>
          <a href={company.social.facebook}><img class="facebook" src="/icons/facebook-square.svg" alt="Facebook Icon"/></a>
          <a href={company.social.twitter}><img class="twitter" src="/icons/twitter-square.svg" alt="Twitter Icon"/></a>
        </div>
        <hr/>
      </div>
      <div class="column vertical">
        <h2>Navigation</h2>
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/index.html?page=menu">Menu</a>
        <a class="nav-link" href="/index.html?page=about">About Us</a>
        <a class="nav-link" href="/index.html?page=contact">Contact</a>
        <hr/>
      </div>
    </div>
  </Container>
</section>

<style>
  a {
    font-size: 1em;
  }

  .facebook {
    max-width: 48px;
    margin: 12px 0;
  }

  .twitter {
    max-width: 48px;
    margin: 12px 24px;
  }

  .yelp {
    max-width: 128px;
    margin: 12px 0;
  }

  .nav-link {
    font-size: 1em;
    transition-duration: 0.4s;
    margin: 6px 6px;
  }

  .nav-link:hover {
    margin-left: 16px;
  }

  h2 {
    text-transform: uppercase;
  }

  * > hr {
    width: 100%;
    border: 0;
    height: 1px;
    background: #45423e;
    margin: 1.6em 0;
  }

  .logo-box {
    height: 150px;
    width: 150px;
  }

  section {
    background-color: var(--secondary-background-color);
  }

  .mobile-three-column-layout {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .column {
    max-width: 320px;
    width: 320px;
    margin: 1.5em;
  }

  .vertical {
    display: flex;
    flex-direction: column;
  }

  .center {
    align-items: center;
  }
</style>