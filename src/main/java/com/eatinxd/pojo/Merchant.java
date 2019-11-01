package com.eatinxd.pojo;

public class Merchant {
    public Merchant() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLikesNum() {
        return likesNum;
    }

    public void setLikesNum(int likesNum) {
        this.likesNum = likesNum;
    }

    public String getImg() {
        return Img;
    }

    public void setImg(String img) {
        Img = img;
    }

    public Merchant(int id, String name, String description, int likesNum, String img) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.likesNum = likesNum;
        Img = img;
    }

    public  int id;
    public String name;
    public String description;
    public int likesNum;
    public String Img;

}
