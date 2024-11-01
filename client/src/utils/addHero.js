const addHero = async (
  values,
  superpowers,
  catch_phrases,
  heroImages,
  func,
  heroId,
) => {
  const formData = new FormData();
  const oldImagesArray = [];
  try {
    formData.append('real_name', values.real_name);
    formData.append('nickname', values.nickname);
    formData.append('sex', values.sex);
    formData.append('alignment', values.alignment);
    formData.append('origin_description', values.origin_description);
    formData.append('height', `${values.height}`);
    formData.append('weight', `${values.weight}`);
    formData.append('age', `${values.age}`);
    formData.append('species', values.species);
    formData.append('mainImg', values.mainImg);
    formData.append('superpowers', JSON.stringify(superpowers));
    formData.append('catch_phrases', JSON.stringify(catch_phrases));
    heroImages.forEach((heroImage, index) => {
      if (heroImage.heroImage) {
        formData.append(`images[${index}][heroImage]`, heroImage.heroImage);
        formData.append(`images[${index}][number]`, heroImage.id);
      } else {
        oldImagesArray.push(heroImage.fileName);
      }
    });
    if (oldImagesArray.length > 0) {
      formData.append('oldImages', JSON.stringify(oldImagesArray));
    }
  } catch (error) {
    console.log('Smth bad heppened while appending form data');
  }
  await func(formData, heroId);
};
export default addHero;
