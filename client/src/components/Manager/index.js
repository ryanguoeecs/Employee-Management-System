import React, { Component } from "react";
import * as actions from "../../actions";
import connect from "react-redux/es/connect/connect";
import { Button, Card, Image } from "semantic-ui-react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class Manager extends Component {
  componentDidMount() {
    this.props.getOneEmployee(this.props.match.params.id);
  }

  profileHandler = el => {
    this.props.history.push(`/employees/${el._id}`);
    this.props.getOneEmployee(el._id);
  };

  editHandler = obj => {
    this.props.setEmployeeToEdit(obj);
    this.props.history.push(`/edit/${obj._id}`);
  };

  render() {
    if (this.props.employees.profile === undefined) {
      return <div>Loading data</div>;
    }
    const drIds = this.props.employees.profile.direct_reports;
    const allEmployees = this.props.employees.data;
    const drs = allEmployees.filter(el => drIds.includes(el._id));
    if (drIds.length === 0) {
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                {`Manager ${this.props.employees.profile.name}`}
              </Typography>
              <div />
            </Toolbar>
          </AppBar>

          <div className="ui grid massive message">
            <div className="ui container ">
              <p style={{ fontSize: "1.33em" }}>There is no direct report</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              {`Manager ${this.props.employees.profile.name}`}
            </Typography>
            <div />
          </Toolbar>
        </AppBar>

        <div className="ui grid massive message">
          <div className="ui container ">
            <Card.Group itemsPerRow={2}>
              {drs.map(el => {
                let avatarUrl = "";
                if (el.avatar !== "Icon") {
                  avatarUrl = "http://localhost:4000/" + el.avatar;
                } else {
                  if (el.gender === "Male") {
                    avatarUrl = "http://localhost:4000/defaultMale.png";
                  } else {
                    avatarUrl = "http://localhost:4000/defaultFemale.png";
                  }
                }
                return (
                  <Card key={el.id}>
                    <Card.Content>
                      <Image floated="right" size="mini" src={avatarUrl} />
                      <Card.Header>{el.name}</Card.Header>
                      <Card.Meta>
                        A {el.gender} {el.title}
                      </Card.Meta>
                      <Card.Description>{el.cell}</Card.Description>
                      <Card.Description>{el.email}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="grey"
                          onClick={() => this.profileHandler(el)}
                        >
                          Profile
                        </Button>
                        <Button
                          basic
                          color="grey"
                          onClick={() => this.editHandler(el)}
                        >
                          Edit
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
            </Card.Group>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOneEmployee: id => {
      dispatch(actions.getOneEmployee(id));
    },
    setEmployeeToEdit: obj => {
      dispatch(actions.setEmployeeToEdit(obj));
    },
    resetScrollCount: () => {
      dispatch({ type: "RESET_SCROLL_COUNT" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager);
