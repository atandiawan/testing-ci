describe('melakukan submit article', function(){
  it('should submit an article', function(done){
    browser.url('/api/articles').setValue('#input_title', 'Test dua kali').setValue('#input_content', 'Halahhalah').click('#article_button')
    console.log(browser.getUrl())
  })
})
