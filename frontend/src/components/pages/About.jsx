const About = () => {
  return (
    <section className="container col-12 col-md-6 py-5">
      <h1>Hey, It's <span className="text-primary" >Harsh</span> 👋</h1>

      <p className="px-2">
        Thanks for visiting Harsh Applications. I really appreciate your time
        and hope this small tool helps you with your image conversion needs.
      </p>

      <p className="px-2">
        This website is created to make image conversion simple and easy. No
        complicated steps, just upload your image, choose the format, and
        convert it.
      </p>

      <h4>About this version</h4>

      <p className="px-2">
        This is <span className="text-decoration-underline">version 1</span> of Harsh Applications. This first version focuses on
        the basic image conversion feature, where you can convert images between
        different formats quickly.
      </p>

      <p className="px-2">
        It is a starting point, and there are many more improvements planned for
        future versions.
      </p>

      <h4>Future plans</h4>

      <p className="px-2">In the next versions, more useful features will be added like:</p>

      <p className="px-2 py-2 lh-sm bg-info-subtle fs-5 border-start border-info border-4">
        Batch conversion, image compression, image resizing, and many more
        interesting tools that make working with images easier.
      </p>

      <h4>A small quote.</h4>

      <p className="px-2 bg-body-tertiary py-2 text-center fs-4 text-capitalize">
        "Every big project starts with a small first version. This is mine, and
        there is more to come."
      </p>

      <p className="px-2 fst-italic">"Sometimes the simple tools are the ones we use the most."</p>

      <h4>Like it?</h4>

      <p className="px-2">
        If you find this tool useful, share it with others. A small share can
        help this little project reach more people.
      </p>
    </section>
  );
};

export default About;