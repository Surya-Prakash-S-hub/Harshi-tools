const About = () => {
  return (
    <section className="container col-12 col-md-6 py-5">
      <h1>
        Hey, It's <span className="text-primary">Harsh</span> 👋
      </h1>

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
        This is <span className="text-decoration-underline">version 2</span> of
        Harsh Applications. In this version, batch image conversion has been
        introduced, allowing users to convert multiple images at once instead of
        processing them individually.
      </p>

      <h6>What's new in Version 2?</h6>
      <ul>
        <li>Batch image conversion support</li>
        <li>Multiple image upload and management</li>
        <li>ZIP download for converted files</li>
        <li>Improved file handling and cleanup</li>
        <li>Better user experience while converting images</li>
      </ul>

      <details className="px-3">
        <summary>version 1</summary>
        <p className="p-2 bg-secondary-subtle">
          The first version focuses on the basic image conversion feature,
          where you can convert images between different formats quickly.
        </p>
      </details>
      <h4>Future plans</h4>

      <p className="px-2">
        In the next versions, more useful features will be added like:
      </p>

      <p className="px-2 py-2 lh-sm bg-info-subtle fs-5 border-start border-info border-4">
        More useful tools are planned for upcoming versions, including image
  compression, resizing, and other interesting features.
      </p>

      <h4>A small quote.</h4>

      <p className="px-2 bg-body-tertiary py-2 text-center fs-4 text-capitalize">
        <q>
          Every big project starts with a small version. This is mine, and
          there is more to come.
        </q>
      </p>

      <p className="px-2 fst-italic">
        <q>Sometimes the simple tools are the ones we use the most.</q>
      </p>

      <h4>Like it?</h4>

      <p className="px-2">
        If you find this tool useful, share it with others. A small share can
        help this little project reach more people.
      </p>
    </section>
  );
};

export default About;
