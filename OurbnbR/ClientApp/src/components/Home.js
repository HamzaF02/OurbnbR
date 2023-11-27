
import "./home.css";

export function Home() {
      return (

          <div>

    <div className="container text-center Front">
        <h1 className="display-4">Ourbnb</h1>
        <p>Stay all around the world, and explore amazing places with us.</p>
    </div>
    <div id="divBack"></div>



    <div className="container">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">

           
            <div className="col txtbox">
                <h4>Hello There Nice to meet you, Welcome to Ourbnb!</h4>
                <p id="txt">
                    Discover the ultimate getaway on our enchanting rental site, where breathtaking views and endless exploration await.
                    Nestled amidst nature's beauty, our properties offer a serene escape from the hustle and bustle of everyday life.
                    Whether you seek the tranquil majesty of mountain vistas, the calming embrace of a lakeside retreat,
                    or the coastal allure of oceanfront hideaways, our rentals provide a front-row seat to nature's wonders.
                </p>
            </div>

          

            <div id="carouselImages" className="carousel slide col" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselImages" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner ">
                    <div className="carousel-item active">
                        <img className="d-block w-100 carpic" src="/images/HouseWater.jpeg" alt="house1"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Nature at Every Corner</h5>
                            <p>A place to feel one with nature, and to appriciate the earths beauty.</p>
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <img className="d-block w-100 carpic" src="/images/LeidHus.jpg" alt="house2"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>A Perfect Place for two Lovers</h5>
                            <p>Experience the suburban lifestyle of the City</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 carpic" src="/images/mountain.jpeg" alt="house3"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>House in the Highest of Mountains</h5>
                            <p>Ever Wondered how it felt to be able to fly? If yes, then this is the place for you.</p>
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <img className="d-block w-100 carpic" src="/images/mc.jpg" alt="house4"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Say Goodbye to Reality, and Say Hi to Virtuality</h5>
                            <p>Time to take it to the next step and experience a whole new world...</p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
       </div>
    </div>

    );
  
}

