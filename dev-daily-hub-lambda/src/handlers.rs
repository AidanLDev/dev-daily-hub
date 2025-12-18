use askama::Template;
use lambda_http::{Response, Body};

#[derive(Template)]
#[template(path = "index.html")]
pub struct IndexTemplate<'a> { pub name: &'a str }

pub async fn index() -> Response<Body> {
  let template = IndexTemplate { name: "Dev Daily Hub" };
  Response::builder()
    .header("content-type", "text/html; charset=utf-8")
    .status(200)
    .body(Body::Text(template.render().unwrap()))
    .unwrap()
}

#[derive(Template)]
#[template(path = "fragment.html")]
struct FragmentTemplate { pub message: &'static str }

pub async fn fragment() -> Response<Body> {
    let f = FragmentTemplate { message: "HTMX loaded content from server" };
    Response::builder()
        .header("content-type", "text/html; charset=utf-8")
        .status(200)
        .body(Body::Text(f.render().unwrap()))
        .unwrap()
}